/**
 * Contact Inquiry API Service
 * Handles communication with the Vardha Builders backend API.
 */

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  inquiry: string;
  message: string;
}

export interface ContactInquiryRecord {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  inquiry: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  data?: ContactInquiryRecord;
  errors?: string[];
}

const RAW_API_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000/api";

export const API_BASE_URL = RAW_API_URL.replace(/\/+$/, "");

/**
 * Sends contact inquiry data to the backend API.
 * Waits for confirmation that the data is safely persisted in MongoDB.
 *
 * @param formData - User input from the contact form
 * @returns Promise resolving to the API response on success
 * @throws Error on network failure, validation error, or backend error
 */
export async function submitContactInquiry(
  formData: ContactFormData
): Promise<ContactApiResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15-second timeout

  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email?.trim() || undefined,
        inquiry: formData.inquiry.trim(),
        message: formData.message.trim(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let result: ContactApiResponse;
    try {
      result = await response.json();
    } catch {
      throw new Error(
        `Server returned an invalid response (${response.status} ${response.statusText}).`
      );
    }

    if (!response.ok || !result.success) {
      const errorMessage =
        result?.message ||
        `Unable to save inquiry. Server responded with status ${response.status}.`;
      throw new Error(errorMessage);
    }

    return result;
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error(
        "Request timed out. Please check your internet connection and try again."
      );
    }

    if (error.message === "Failed to fetch") {
      throw new Error(
        "Unable to reach the server. Please verify the backend is running and try again."
      );
    }

    throw error;
  }
}
