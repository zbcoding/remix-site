import { Link, LinksFunction, useLoaderData } from "remix"
import { getPosts } from "~/post";
import type { Post } from "~/post";

import stylesUrl from "~/styles/global.css"

export let loader = () => {
	return getPosts();
};

export let links: LinksFunction = () => {
	return [{rel: "stylesheet", href: stylesUrl}];
};

export default function Posts() {
	let posts: Post[] = useLoaderData();
	console.log(posts);
	return (
		<div>
			<h1>Posts</h1>
		<ul>
			{posts.map(post => (
				<li key={post.slug}>
					<Link to={post.slug}>{post.title}</Link>
				</li>
			))}
		</ul>
		</div>
	)
}