# Vidinfra Dashboard

Vidinfra Dashboard is a modern web application for managing CDN distributions, analytics, and administrative actions. Built with [Next.js App Router](https://nextjs.org/docs/app), React, and TypeScript, it provides a responsive and user-friendly interface for cloud distribution management.

## Features

- **Distributions Table:**  
  View, filter, and paginate CDN distributions with real-time status indicators.
- **Actions Menu:**  
  Manage, purge, disable, or delete distributions directly from the table.
- **Analytics Integration:**  
  Access distribution analytics with a single click.
- **Advanced Filtering:**  
  Filter distributions by status, label, date range, and more.
- **Pagination & Row Controls:**  
  Select rows per page and navigate through paginated results.
- **Skeleton Loading:**  
  Smooth loading experience with skeleton UI components.
- **Error Handling:**  
  User-friendly error messages for failed API requests.

## Technologies Used

- **Next.js (App Router)**
- **React** (with hooks)
- **TypeScript**
- **TanStack Table** (React Table)
- **TanStack Query** (React Query)
- **date-fns** (date formatting)
- **Lucide Icons** (SVG icons)
- **Tailwind CSS** (utility-first styling)
- **Custom UI Components** (Badge, Button, Dropdown, Table, Skeleton, Select)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Shakilofficial/vidinfra-dashboard.git
   cd vidinfra-dashboard
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and set:

   ```
   NEXT_PUBLIC_BASE_API_URL=https://api-staging.tenbyte.io/cdn
   ```

4. **Run the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  components/
    DistributionsTable.tsx
    DistributionsContent.tsx
    ui/
      badge.tsx
      button.tsx
      dropdown-menu.tsx
      skeleton.tsx
      table.tsx
      select.tsx
  lib/
    api.ts
  app/
    page.tsx
    layout.tsx
```

- **components/**: UI and feature components.
- **lib/**: API utilities and helpers.
- **app/**: Next.js App Router pages and layouts.

## API Reference

- **fetchDistributions(filters: Filters): Promise\<DistributionsApiResponse\>**
  - Fetches distributions with filtering, sorting, and pagination.
  - Throws error on failed requests.

## Customization

- **UI Theme:**  
  Easily customizable via Tailwind CSS classes.
- **API Endpoint:**  
  Change `NEXT_PUBLIC_BASE_API_URL` in `.env.local` for different environments.

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js App Router.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For support or inquiries,
# vidinfra-dashboard
