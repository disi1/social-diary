import { useState } from "react";
import { SpinnerFullPage } from "../../../components/Spinner";
import Router, { useRouter } from "next/router";
import { useAuth } from "../../../lib/auth";
import { Priority, usePriority } from "../../../lib/priority";
import Layout from "../../../components/layout/Layout";
import { Alert } from "../../../components/Alert";
import { ManagePriorityForm } from "../../../components/priorities/ManagePriorityForm";
import { ROUTE_CONFIGURATION } from "../../../config";
import useUpdatePriority from "../../../lib/hooks/priority/useUpdatePriority";

const EditPriorityPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { loading } = useAuth();
  const { priorities } = usePriority();

  const { id } = useRouter().query;

  const currentPriority =
    id && typeof id === "string"
      ? (priorities?.find(
          (priority) => priority.id === parseInt(id)
        ) as Priority)
      : null;

  const { mutate, isLoading } = useUpdatePriority();

  const onSubmit = async (priority: Priority) => {
    if (currentPriority) {
      mutate(
        {
          name: priority.name,
          frequency: priority.frequency,
          user_id: priority.user_id,
          id: currentPriority?.id,
        },
        {
          onSuccess: (status: number) => {
            if (status === 200) {
              setSuccessMessage("Your priority was successfully updated.");
              Router.push(ROUTE_CONFIGURATION);
              setSuccessMessage(undefined);
            }
          },
          onError: (error) => {
            setErrorMessage((error as Error).message);
          },
        }
      );
    }
  };

  const onCancel = () => {};

  return (
    currentPriority && (
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

        <ManagePriorityForm
          priority={currentPriority}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />

        {(loading || isLoading) && <SpinnerFullPage />}
      </Layout>
    )
  );
};

export default EditPriorityPage;
