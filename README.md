# Vardha Builders — Immersive 3D Website

Fresh production-oriented starter for a premium architectural / real-estate experience.

## Stack
- React + Vite + TypeScript
- Tailwind CSS
- Three.js / React Three Fiber / Drei
- GSAP + ScrollTrigger
- Express
- MongoDB / Mongoose
- Lucide React

## Run
```bash
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000/api/health

## Data policy
Business facts, project statistics, addresses, pricing and testimonials are intentionally represented as placeholders until verified Vardha Builders data is supplied.

## 3D model
Place a real GLB/GLTF model under:
`frontend/public/models/`
and update the model path in `src/components/three/BuildingModel.tsx`.

The current hero has a lightweight procedural architectural fallback so the site remains usable without a model.
