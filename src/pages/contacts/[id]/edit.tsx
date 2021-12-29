import { Contact } from "../../../lib/contact";
import { useCategory } from "../../../lib/category";
import { usePriority } from "../../../lib/priority";
import { GetServerSideProps, NextPage } from "next";
import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import Layout from "../../../components/layout/Layout";
import { supabase } from "../../../lib";
import { ROUTE_AUTH } from "../../../config";
import { ManageContactForm } from "../../../components/contacts/ManageContactForm";
import { Alert } from "../../../components/Alert";
import { useState } from "react";

interface EditContactPageProps {
  contacts: Contact[];
}

const EditContactPage: NextPage<EditContactPageProps> = ({ contacts }) => {
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
      .eq("id", contacts[0].id);

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else if (status === 200) {
      setSuccessMessage("Your contact was successfully updated.");
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
        categories={categories}
        contact={contacts[0]}
        priorities={priorities}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Layout>
  );
};

export default EditContactPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user } = await supabase.auth.api.getUserByCookie(context.req);

    if (!user) {
      return {
        redirect: {
          destination: ROUTE_AUTH,
          permanent: false,
        },
      };
    } else {
      supabase.auth.setAuth(context.req.cookies["sb:token"]);

      const { data: contacts } = await supabase
        .from("contact")
        .select("*")
        .eq("user_id", user.id)
        .eq("id", context.params?.id);

      return {
        props: {
          contacts: contacts as Contact[],
        },
      };
    }
  } catch (err) {
    return {
      props: {},
    };
  }
};
