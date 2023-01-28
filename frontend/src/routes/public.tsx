// import { lazyImport } from "@/utils/lazyImports";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { lazyImport } from "../utils/lazyImports";

const { PublicAuthRoutes } = lazyImport(
  () => import("../features/auth"),
  "PublicAuthRoutes"
);
const { ItemRoutes } = lazyImport(
  () => import("../features/items"),
  "ItemRoutes"
);


// const App = () => {
//   return (
//     <MainLayout>
//       <Suspense
//         fallback={
//           <div
//             className="w-full flex items-center justify-center absolute"
//             style={{ height: "calc(100vh - 6rem)" }}
//           >
//             <Spinner size="xl" />
//           </div>
//         }
//       >
//         <div
//           style={{ height: "calc(100vh - 6rem)", overflowY: "scroll" }}
//           className={clsx("px-0 md:px-9", "py-7")}
//         >
//           <Outlet />
//         </div>
//       </Suspense>
//     </MainLayout>
//   );
// };

// export const Auth = () => {
//   return (
//     <Suspense
//       fallback={
//         <div className="h-screen w-screen flex items-center justify-center">
//           <Spinner size="xl" />
//         </div>
//       }
//     >
//       <Outlet />
//     </Suspense>
//   );
// };

export const publicRoutes = [
  {
    path: "/items/*",
    element: <ItemRoutes />,
  },
  {
    path: "/auth/*",
    element: <PublicAuthRoutes />,
  },
  {
    path: "*",
    element: <Navigate to="/items" />,
  },
];
