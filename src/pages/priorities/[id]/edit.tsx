import { useEffect, useState } from "react";
import { SpinnerFullPage } from "../../../components/Spinner";
import Router, { useRouter } from "next/router";
import { useAuth } from "../../../lib/auth";
import { Priority, usePriority } from "../../../lib/priority";
import { supabase } from "../../../lib";
import Layout from "../../../components/layout/Layout";
import { Alert } from "../../../components/Alert";
import { ManagePriorityForm } from "../../../components/priorities/ManagePriorityForm";
import { ROUTE_CONFIGURATION } from "../../../config";

const EditPriorityPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { user, loading } = useAuth();
  const { priorities } = usePriority();

  const { id } = useRouter().query;

  const currentPriority =
    id && typeof id === "string"
      ? (priorities?.find(
          (priority) => priority.id === parseInt(id)
        ) as Priority)
      : null;

  useEffect(() => {
    if (successMessage) {
      setIsLoading(true);
      Router.push(ROUTE_CONFIGURATION);
      setSuccessMessage(undefined);
      setIsLoading(false);
    }
  }, [successMessage]);

  const onSubmit = async (priority: Priority) => {
    setIsLoading(true);

    const { error, status } = await supabase
      .from("priority")
      .update({
        name: priority.name,
        frequency: priority.frequency,
        user_id: user?.id,
      })
      .eq("id", currentPriority?.id);

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else if (status === 200) {
      setSuccessMessage("Your priority was successfully updated.");
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
