import { useRootNavigationState, router } from 'expo-router';

export default function Index() {
    const rootNavigationState = useRootNavigationState();
    if (!rootNavigationState?.key) return null;
    else router.replace('/login');
}