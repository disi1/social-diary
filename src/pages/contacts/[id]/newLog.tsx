import { useState } from "react";
import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import { Alert } from "../../../components/Alert";
import Layout from "../../../components/layout/Layout";
import { Contact, useContact } from "../../../lib/contact";
import { Log } from "../../../lib/log";
import { ManageLogForm } from "../../../components/logs/ManageLogForm";
import Router, { useRouter } from "next/router";
import { ROUTE_HOME } from "../../../config";
import useCreateLog from "../../../lib/hooks/log/useCreateLog";

const NewLogPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { user, loading } = useAuth();
  const { contacts } = useContact();

  const { id } = useRouter().query;
  const thisContact =
    id && typeof id === "string"
      ? (contacts?.find((contact) => contact.id === parseInt(id)) as Contact)
      : null;

  const { mutate, isLoading } = useCreateLog();

  const onSubmit = async (log: Log) => {
    if (user) {
      mutate(
        {
          contact_id: log.contact_id,
          note: log.note,
          timestamp: log.timestamp,
          user_id: log.user_id,
        },
        {
          onSuccess: (status: number) => {
            if (status === 201) {
              setSuccessMessage("Your new Log was successfully saved.");
              Router.push(`${ROUTE_HOME}/${thisContact?.id}`);
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
    thisContact && (
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

        <ManageLogForm
          contact={thisContact}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />

        {(loading || isLoading) && <SpinnerFullPage />}
      </Layout>
    )
  );
};

export default NewLogPage;
