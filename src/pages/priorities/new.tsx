import { useAuth } from "../../lib/auth";
import { useState } from "react";
import { SpinnerFullPage } from "../../components/Spinner";
import { Priority } from "../../lib/priority";
import Layout from "../../components/layout/Layout";
import { Alert } from "../../components/Alert";
import { ManagePriorityForm } from "../../components/priorities/ManagePriorityForm";
import Router from "next/router";
import { ROUTE_CONFIGURATION } from "../../config";
import useCreatePriority from "../../lib/hooks/priority/useCreatePriority";

const NewPriorityPage = () => {
  const { user, loading } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { mutate, isLoading } = useCreatePriority();

  const onSubmit = async (priority: Priority) => {
    if (user) {
      mutate(
        {
          name: priority.name,
          frequency: priority.frequency,
          user_id: user.id,
        },
        {
          onSuccess: (status: number) => {
            if (status === 201) {
              setSuccessMessage("Your new priority was successfully saved.");
              Router.push(ROUTE_CONFIGURATION);
              setSuccessMessage(undefined);
            }
          },
          onError: (error) => {
            setErrorMessage((error as Error).message);
          },
        }
      );
    } else throw new Error("User is not authenticated");
  };

  const onCancel = () => {};

  return (
    <Layout>
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
      <ManagePriorityForm onSubmit={onSubmit} onCancel={onCancel} />

      {(loading || isLoading) && <SpinnerFullPage />}
    </Layout>
  );
};

export default NewPriorityPage;
