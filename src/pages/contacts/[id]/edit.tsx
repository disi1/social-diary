import { Contact, useContact } from "../../../lib/contact";
import { useCategory } from "../../../lib/category";
import { usePriority } from "../../../lib/priority";
import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import Layout from "../../../components/layout/Layout";
import { ManageContactForm } from "../../../components/contacts/ManageContactForm";
import { Alert } from "../../../components/Alert";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import { ROUTE_HOME } from "../../../config";
import useUpdateContact from "../../../lib/hooks/contact/useUpdateContact";

const EditContactPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { user, loading } = useAuth();
  const { categories } = useCategory();
  const { priorities } = usePriority();
  const { contacts } = useContact();

  const { id } = useRouter().query;

  const currentContact =
    id && typeof id === "string"
      ? (contacts?.find((contact) => contact.id === parseInt(id)) as Contact)
      : null;

  const { mutate, isLoading } = useUpdateContact();

  const onSubmit = async (contact: Contact) => {
    if (user) {
      mutate(
        {
          id: currentContact?.id,
          name: contact.name,
          relationship: contact.relationship,
          location: contact.location,
          category_id: contact.category_id,
          priority_id: contact.priority_id,
          user_id: user.id,
        },
        {
          onSuccess: (status: number) => {
            if (status === 200) {
              setSuccessMessage("Your contact was successfully updated.");
              Router.push(`${ROUTE_HOME}/${id}`);
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
    currentContact && (
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
          categories={categories}
          contact={currentContact}
          priorities={priorities}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />

        {(loading || isLoading) && <SpinnerFullPage />}
      </Layout>
    )
  );
};

export default EditContactPage;
