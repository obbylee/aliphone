import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Aliphone" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function () {
  return (
    <main className="w-full mx-auto max-w-[1200px]">
      <div className="py-36">
        <h1 className="text-2xl mb-4">About Us</h1>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
              accusamus. Consequuntur delectus qui incidunt cumque aspernatur
              sequi voluptatibus voluptas distinctio. Quas officia rerum culpa
              voluptatibus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              ut ullam expedita, commodi dolor sit harum eos repudiandae
              aliquid? Vitae tempore natus, incidunt repudiandae iste rerum
              excepturi quo qui sed odit delectus unde et voluptates vero
              repellat fugiat at suscipit itaque molestias. Eius aliquid ratione
              delectus, molestias odio labore perferendis.
            </p>
          </div>

          <div className="w-full h-[300px] rounded bg-gray-300" />
        </div>
      </div>
    </main>
  );
}
