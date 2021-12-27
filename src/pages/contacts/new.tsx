import { useAuth } from "../../lib/auth";
import { SpinnerFullPage } from "../../components/Spinner";
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import { NewContactForm } from "../../components/contacts/NewContactForm";
import { useCategory } from "../../lib/category";
import { usePriority } from "../../lib/priority";
import { Contact } from "../../lib/contact";
import { useState } from "react";
import { supabase } from "../../lib";
import { Alert } from "../../components/Alert";

const NewContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { user, loading } = useAuth();

  const { categories } = useCategory();

  const { priorities } = usePriority();

  if (loading || isLoading) {
    return <SpinnerFullPage />;
  }

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
    <>
      {!user && (
        <div className="h-screen flex flex-col justify-center items-center relative">
          <h2 className="text-3xl my-4">Howdie, Explorer!</h2>
          <small className="mb-2">
            You&apos;ve landed on a protected page. Please{" "}
            <Link href="/">log in</Link> to view the page&apos;s full content{" "}
          </small>
        </div>
      )}
      {user && (
        <Layout>
          {errorMessage && (
            <Alert type="error" text={errorMessage} onClose={setErrorMessage} />
          )}
          {successMessage && (
            <Alert
              type="success"
              text={successMessage}
              onClose={setErrorMessage}
            />
          )}

          <NewContactForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            categories={categories}
            priorities={priorities}
          />
        </Layout>
      )}
    </>
  );
};

export default NewContactPage;
