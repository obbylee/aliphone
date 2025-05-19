import type { Route } from "./+types/product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products - Aliphone" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function () {
  return (
    <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 p-4">
      <aside className="bg-gray-100 rounded-md p-6">
        <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox rounded text-indigo-600 mr-2"
            />
            <span>Category A</span>
          </label>
        </div>
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox rounded text-indigo-600 mr-2"
            />
            <span>Category B</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price Range:
          </label>
          <div className="flex items-center">
            <input
              type="number"
              placeholder="Min"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-2"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ml-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Min. Order:
          </label>
          <div className="flex items-center">
            <input
              type="number"
              placeholder="Min"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-2"
            />
          </div>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Apply Filters
        </button>
      </aside>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="bg-white h-72 border border-gray-200 rounded-md p-4 shadow-sm"
          >
            Product {i + 1}
          </div>
        ))}
      </main>
    </div>
  );
}
