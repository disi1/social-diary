import {useAuth} from "../../lib/auth";
import {useState} from "react";
import {SpinnerFullPage} from "../../components/Spinner";
import {supabase} from "../../lib";
import {Priority} from "../../lib/priority";
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import {Alert} from "../../components/Alert";
import {NewPriorityForm} from "../../components/priorities/NewPriorityForm";

const NewPriorityPage = () => {
    const { user, loading } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();

    if (loading || isLoading) {
        return <SpinnerFullPage />;
    }

    const onSubmit = async (priority: Priority) => {
        setIsLoading(true);

        const { error, status } = await supabase
            .from("priority")
            .insert([{ name: priority.name, frequency: priority.frequency, user_id: user?.id }]);

        setIsLoading(false);

        if (error) {
            setErrorMessage(error.message);
        } else if (status === 201) {
            setSuccessMessage("Your new priority was successfully saved.");
        }
    };

    const onCancel = () => {};

    return (
        <>
            {!user && (
                <div className="h-screen flex flex-col justify-center items-center relative">
                    <h2 className="text-3xl my-4">Howdie, Explorer!</h2>
                    <small className="mb-2">
                        You&apos;ve landed on a protected page. Please{" "}
                        <Link href="/">log in</Link> to view the page&apos;s full content{" "}
                    </small>
                </div>
            )}
            {user && (
                <Layout>
                    {errorMessage && <Alert type="error" text={errorMessage} onClose={setErrorMessage}/>}
                    {successMessage && <Alert type="success" text={successMessage} onClose={setSuccessMessage}/>}
                    <NewPriorityForm onSubmit={onSubmit} onCancel={onCancel} />
                </Layout>
            )}
        </>
    );
}

export default NewPriorityPage;
