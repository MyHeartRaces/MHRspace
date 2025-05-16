import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import '../styles/globals.css';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <EnhancedNavbar />
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}

export default MyApp;