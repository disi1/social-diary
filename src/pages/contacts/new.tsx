import {useAuth} from "../../lib/auth";
import {SpinnerFullPage} from "../../components/Spinner";
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import {NewContactForm} from "../../components/contacts/NewContactForm";

const NewContactPage = () => {
    const {
        user,
        loading,
    } = useAuth();

    if (loading) {
        return <SpinnerFullPage />;
    }

    return (
        <>
            {!user && (
                <div className="h-screen flex flex-col justify-center items-center relative">
                    <h2 className="text-3xl my-4">
                        Howdie, Explorer!
                    </h2>
                    <small className="mb-2">
                        You&apos;ve landed on a protected page. Please{" "}
                        <Link href="/">log in</Link> to view the page&apos;s full content{" "}
                    </small>
                </div>
            )}
            {user && (
                <Layout>
                    <NewContactForm/>
                </Layout>
            )}
        </>
    )
}

export default NewContactPage;
