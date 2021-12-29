import { Contact, useContact } from "../../../lib/contact";
import { useCategory } from "../../../lib/category";
import { usePriority } from "../../../lib/priority";
import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import Layout from "../../../components/layout/Layout";
import { supabase } from "../../../lib";
import { ManageContactForm } from "../../../components/contacts/ManageContactForm";
import { Alert } from "../../../components/Alert";
import { useState } from "react";
import { useRouter } from "next/router";

const EditContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { user, loading } = useAuth();
  const { categories } = useCategory();
  const { priorities } = usePriority();
  const { contacts } = useContact();

  if (loading || isLoading) {
    return <SpinnerFullPage />;
  }

  const { id } = useRouter().query;

  const currentContact =
    id && typeof id === "string"
      ? (contacts?.find((contact) => contact.id === parseInt(id)) as Contact)
      : null;

  const onSubmit = async (contact: Contact) => {
    setIsLoading(true);

    const { error, status, data } = await supabase
      .from("contact")
      .update({
        name: contact.name,
        relationship: contact.relationship,
        location: contact.location,
        category_id: contact.category_id,
        priority_id: contact.priority_id,
        user_id: user?.id,
      })
      .eq("id", currentContact?.id);

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else if (status === 200) {
      setSuccessMessage("Your contact was successfully updated.");
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
      </Layout>
    )
  );
};

export default EditContactPage;