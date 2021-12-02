import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader


// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div>
      <p>Welcome to the site.</p>
      <div className="github-link">
        <a href="https://github.com/zbcoding" target="_blank">My Github</a>
      </div>
    </div>
    );
}
