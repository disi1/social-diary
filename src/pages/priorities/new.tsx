import { useAuth } from "../../lib/auth";
import { useState } from "react";
import { SpinnerFullPage } from "../../components/Spinner";
import { supabase } from "../../lib";
import { Priority } from "../../lib/priority";
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import { Alert } from "../../components/Alert";
import { ManagePriorityForm } from "../../components/priorities/ManagePriorityForm";

const NewPriorityPage = () => {
  const { user, loading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const onSubmit = async (priority: Priority) => {
    setIsLoading(true);

    const { error, status } = await supabase
      .from("priority")
      .insert([
        {
          name: priority.name,
          frequency: priority.frequency,
          user_id: user?.id,
        },
      ]);

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else if (status === 201) {
      setSuccessMessage("Your new priority was successfully saved.");
    }
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
