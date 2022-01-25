import { useState } from "react";
import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import Router, { useRouter } from "next/router";
import { Category, useCategory } from "../../../lib/category";
import Layout from "../../../components/layout/Layout";
import { Alert } from "../../../components/Alert";
import { ManageCategoryForm } from "../../../components/categories/ManageCategoryForm";
import { ROUTE_CONFIGURATION } from "../../../config";
import useUpdateCategory from "../../../lib/hooks/category/useUpdateCategory";

const EditCategoryPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { loading } = useAuth();
  const { categories } = useCategory();

  const { id } = useRouter().query;

  const currentCategory =
    id && typeof id === "string"
      ? (categories?.find(
          (category) => category.id === parseInt(id)
        ) as Category)
      : null;

  const { mutate, isLoading } = useUpdateCategory();

  const onSubmit = async (category: Category) => {
    mutate(
      {
        name: category.name,
        user_id: category.user_id,
        id: currentCategory?.id,
      },
      {
        onSuccess: (status: number) => {
          if (status === 200) {
            setSuccessMessage("Your category was successfully updated.");
            Router.push(ROUTE_CONFIGURATION);
            setSuccessMessage(undefined);
          }
        },
        onError: (error) => {
          setErrorMessage((error as Error).message);
        },
      }
    );
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
