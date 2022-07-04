import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
    return (
        <>
            <main className="main-404">
                <div className="d-table-cell align-middle">
                    <div className="text-center">
                        <h1 className="display-1 font-weight-bold">404</h1>
                        <p className="h1">Page not found.</p>
                        <p className="h2 font-weight-normal mt-3 mb-4">
                            The page you are looking for might have been removed.
                        </p>
                        <Link to="/" className="btn btn-hero">
                            Return to website
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PageNotFound;
