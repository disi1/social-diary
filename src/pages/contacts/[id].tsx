import { useAuth } from "../../lib/auth";
import { SpinnerFullPage } from "../../components/Spinner";
import Layout from "../../components/layout/Layout";
import { GetServerSideProps, NextPage } from "next";
import { supabase } from "../../lib";
import { ROUTE_AUTH } from "../../config";
import { Contact } from "../../lib/contact";
import {Priority} from "../../lib/priority";
import {Category} from "../../lib/category";
import {ContactDetails} from "../../components/contacts/ContactDetails";
import {Log} from "../../lib/log";

interface ContactDetailsPageProps {
  contacts: Contact[];
  categories: Category[];
  priorities: Priority[];
  logs: Log[];
}

const ContactDetailsPage: NextPage<ContactDetailsPageProps> = ({ contacts, priorities, categories, logs }) => {
  const { loading } = useAuth();

  if (loading) {
    return <SpinnerFullPage />;
  }

  return <Layout>
    <ContactDetails category={categories[0]} contact={contacts[0]} logs={logs} priority={priorities[0]}/>
  </Layout>;
};

export default ContactDetailsPage;

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

      let prioritiesRes;
      let categoriesRes;
      let logsRes;

      const { data: contacts } = await supabase
        .from("contact")
        .select("*")
        .eq("user_id", user.id)
        .eq("id", context.params?.id);

      if (contacts) {
        prioritiesRes = await supabase
            .from("priority")
            .select("*")
            .eq("user_id", user.id)
            .eq("id", contacts[0].priority_id);
      }

      if (contacts) {
        categoriesRes = await supabase
            .from("category")
            .select("*")
            .eq("user_id", user.id)
            .eq("id", contacts[0].category_id);
      }

      if (contacts) {
        logsRes = await supabase
            .from("log")
            .select("*")
            .eq("user_id", user.id)
            .eq("contact_id", contacts[0].id);
      }

      return {
        props: {
          contacts: contacts as Contact[],
          priorities: prioritiesRes?.data as Priority[],
          categories: categoriesRes?.data as Category[]
        },
      };
    }
  } catch (err) {
    return {
      props: {},
    };
  }
};
