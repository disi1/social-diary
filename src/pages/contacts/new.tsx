import { useAuth } from "../../lib/auth";
import { SpinnerFullPage } from "../../components/Spinner";
import Layout from "../../components/layout/Layout";
import { ManageContactForm } from "../../components/contacts/ManageContactForm";
import { useCategory } from "../../lib/category";
import { usePriority } from "../../lib/priority";
import { Contact } from "../../lib/contact";
import { useState } from "react";
import { Alert } from "../../components/Alert";
import Router from "next/router";
import { ROUTE_HOME } from "../../config";
import useCreateContact from "../../lib/hooks/contact/useCreateContact";

const NewContactPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { user, loading } = useAuth();
  const { categories } = useCategory();
  const { priorities } = usePriority();

  const { mutate, isLoading } = useCreateContact();

  const onSubmit = async (contact: Contact) => {
    if (user) {
      mutate(
        {
          name: contact.name,
          relationship: contact.relationship,
          location: contact.location,
          category_id: contact.category_id,
          priority_id: contact.priority_id,
          user_id: user.id,
        },
        {
          onSuccess: (status: number) => {
            if (status === 201) {
              setSuccessMessage("Your new contact was successfully saved.");
              Router.push(ROUTE_HOME);
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

      <ManageContactForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        categories={categories}
        priorities={priorities}
      />

      {(loading || isLoading) && <SpinnerFullPage />}
    </Layout>
  );
};

export default NewContactPage;
