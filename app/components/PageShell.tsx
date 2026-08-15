import { ModernNavbar } from "./ModernNavbar";
import Footer from "./Footer";
import RouteTransition from "./RouteTransition";

interface PageShellProps {
    children: React.ReactNode;
    headerVariant?: "transparent" | "solid";
}

export default function PageShell({ children }: PageShellProps) {
    return (
        <>
            <a href="#page-content" className="skip-link">Skip to content</a>
            <ModernNavbar />

            <div id="page-content" tabIndex={-1}>
                <RouteTransition>{children}</RouteTransition>
            </div>

            <Footer />
        </>
    );
}
