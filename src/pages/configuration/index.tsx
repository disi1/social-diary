import {usePriority} from "../../lib/priority";
import {useCategory} from "../../lib/category";
import Layout from "../../components/layout/Layout";
import {ContactList} from "../../components/contacts/ContactList";
import {Configuration} from "../../components/configuration/Configuration";

const ConfigurationPage = () => {
    const { priorities } = usePriority();
    const { categories } = useCategory();

    return (
        <Layout>
            <Configuration categories={categories} priorities={priorities} />
        </Layout>
    );
}

export default ConfigurationPage;
