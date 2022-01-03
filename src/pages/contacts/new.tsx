import { useAuth } from "../../lib/auth";
import { SpinnerFullPage } from "../../components/Spinner";
import Layout from "../../components/layout/Layout";
import { ManageContactForm } from "../../components/contacts/ManageContactForm";
import { useCategory } from "../../lib/category";
import { usePriority } from "../../lib/priority";
import { Contact } from "../../lib/contact";
import {useEffect, useState} from "react";
import { supabase } from "../../lib";
import { Alert } from "../../components/Alert";
import Router from "next/router";
import {ROUTE_HOME} from "../../config";

const NewContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { user, loading } = useAuth();
  const { categories } = useCategory();
  const { priorities } = usePriority();

  useEffect(() => {
    if (successMessage) {
      setIsLoading(true);
      Router.push(ROUTE_HOME);
      setSuccessMessage(undefined);
      setIsLoading(false);
    }
  });

  const onSubmit = async (contact: Contact) => {
    setIsLoading(true);

    const { error, status } = await supabase.from("contact").insert([
      {
        name: contact.name,
        relationship: contact.relationship,
        location: contact.location,
        category_id: contact.category_id,
        priority_id: contact.priority_id,
        user_id: user?.id,
      },
    ]);

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else if (status === 201) {
      setSuccessMessage("Your new contact was successfully saved.");
    }
  };

  const onCancel = () => {};

  return (
    <Layout>
      {errorMessage && (
        <Alert type="error" text={errorMessage} onClose={setErrorMessage} />
      )}
      {successMessage && (
        <Alert type="success" text={successMessage} onClose={setSuccessMessage} />
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
