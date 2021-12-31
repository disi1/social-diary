import {usePriority} from "../../lib/priority";
import {Category, useCategory} from "../../lib/category";
import Layout from "../../components/layout/Layout";
import {Configuration} from "../../components/configuration/Configuration";
import {useEffect, useState} from "react";
import {useAuth} from "../../lib/auth";
import {supabase} from "../../lib";
import {Alert} from "../../components/Alert";
import {SpinnerFullPage} from "../../components/Spinner";
import Router from "next/router";
import {ROUTE_AUTH, ROUTE_CONFIGURATION} from "../../config";

const ConfigurationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();
    const [categoryToBeRemoved, setCategoryToBeRemoved] = useState<
        Category | undefined
        >(undefined);

    const { loading } = useAuth();
    const { priorities } = usePriority();
    const { categories } = useCategory();

    useEffect(() => {
        if(successMessage) {
            Router.push(ROUTE_CONFIGURATION);
        }
    }, [successMessage])

    const onRemoveHandler = async () => {
        if(categoryToBeRemoved) {
            setIsLoading(true);

            const { error, status } = await supabase
                .from("category")
                .delete()
                .eq("user_id", categoryToBeRemoved.user_id)
                .eq("id", categoryToBeRemoved?.id);

            setCategoryToBeRemoved(undefined)
            setIsLoading(false);

            if (error) {
                setErrorMessage(error.message);
            } else if (status === 200) {
                setSuccessMessage("Your category was successfully removed.");
            }
        }
    }

    return (
        <Layout>
            <div className="absolute top-10 right-0">
                {categoryToBeRemoved && (
                    <Alert
                        type="confirm"
                        text={`Remove the "${categoryToBeRemoved?.name}" category?`}
                        onClose={setCategoryToBeRemoved}
                        onCancel={setCategoryToBeRemoved}
                        onConfirm={onRemoveHandler}
                    />
                )}

                {errorMessage && (
                    <Alert type="error" text={errorMessage} onClose={setErrorMessage} />
                )}

                {successMessage && (
                    <Alert
                        type="success"
                        text={successMessage}
                        onClose={setSuccessMessage}
                    />
                )}
            </div>

            <Configuration categories={categories} priorities={priorities} onRemove={setCategoryToBeRemoved}/>

            {(loading || isLoading) && <SpinnerFullPage />}
        </Layout>
    );
}

export default ConfigurationPage;
