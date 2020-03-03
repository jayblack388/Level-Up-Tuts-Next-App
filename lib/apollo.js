import Head from 'next/head';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';
import { InMemoryCache } from 'apollo-cache-inmemory';

const isDev = process.env.NODE_ENV !== 'production';
const uri = `${isDev ? 'http://localhost:3000' : 'https://tracker-ten.now.sh'}`;

export function withApollo(PageComponent) {
	const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
		const client = apolloClient || initClient(apolloState);

		return (
			<ApolloProvider client={client}>
				<PageComponent {...pageProps} />
			</ApolloProvider>
		);
	};

	WithApollo.getInitialProps = async ctx => {
		const { AppTree } = ctx;
		const apolloClient = (ctx.apolloClient = initClient());

		let pageProps = {};
		if (PageComponent.getInitialProps) {
			pageProps = await PageComponent.getInitialProps(ctx);
		}
		if (typeof window === 'undefined') {
			if (ctx.res && ctx.res.finished) {
				return pageProps;
			}
			try {
				const { getDataFromTree } = await import('@apollo/react-ssr');
				await getDataFromTree(
					<AppTree pageProps={{ ...pageProps, apolloClient }} />
				);
			} catch (e) {
				console.error(e);
			}
			Head.rewind();
		}
		const apolloState = apolloClient.cache.extract();
		return { ...pageProps, apolloState };
	};

	return WithApollo;
}

const initClient = (initialState = {}) => {
	const cache = new InMemoryCache().restore(initialState);

	const client = new ApolloClient({
		cache,
		fetch,
		uri: `${uri}/api/graphql`,
	});
	return client;
};
