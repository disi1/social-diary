import { ContactItem } from "./ContactItem";
import { Category } from "../../lib/category";
import {Contact} from "../../lib/contact";

interface ContactListProps {
  contacts: Contact[] | undefined;
  categories: Category[] | undefined;
}

export const ContactList: React.FC<ContactListProps> = ({ categories, contacts }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {categories?.map((category) => (
        <div className="grid grid-cols-1 gap-2 p-5" key={category.id}>
          <div>{category.name}</div>
          {contacts?.map(
            (contact) =>
              contact.category_id === category.id && (
                <ContactItem contact={contact} key={contact.id} />
              )
          )}
        </div>
      ))}
    </div>
  );
};
