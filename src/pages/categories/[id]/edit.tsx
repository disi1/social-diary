import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import Router, { useRouter } from "next/router";
import { Category, useCategory } from "../../../lib/category";
import { supabase } from "../../../lib";
import Layout from "../../../components/layout/Layout";
import { Alert } from "../../../components/Alert";
import { ManageCategoryForm } from "../../../components/categories/ManageCategoryForm";
import { ROUTE_CONFIGURATION } from "../../../config";

const EditCategoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { user, loading } = useAuth();
  const { categories } = useCategory();

  const { id } = useRouter().query;

  const currentCategory =
    id && typeof id === "string"
      ? (categories?.find(
          (category) => category.id === parseInt(id)
        ) as Category)
      : null;

  useEffect(() => {
    if (successMessage) {
      setIsLoading(true);
      Router.push(ROUTE_CONFIGURATION);
      setSuccessMessage(undefined);
      setIsLoading(false);
    }
  });

  const onSubmit = async (category: Category) => {
    setIsLoading(true);

    const { error, status } = await supabase
      .from("category")
      .update({
        name: category.name,
        user_id: user?.id,
      })
      .eq("id", currentCategory?.id);

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else if (status === 200) {
      setSuccessMessage("Your category was successfully updated.");
    }
  };

  const onCancel = () => {};

  return (
    currentCategory && (
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

        <ManageCategoryForm
          category={currentCategory}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />

        {(loading || isLoading) && <SpinnerFullPage />}
      </Layout>
    )
  );
};

export default EditCategoryPage;
