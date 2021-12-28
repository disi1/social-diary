import { ContactItem } from "./ContactItem";
import { Category } from "../../lib/category";
import { Contact } from "../../lib/contact";
import { Log } from "../../lib/log";
import { Priority } from "../../lib/priority";

interface ContactListProps {
  contacts: Contact[] | undefined;
  categories: Category[] | undefined;
  logs: Log[] | undefined;
  priorities: Priority[] | undefined;
}

export const ContactList: React.FC<ContactListProps> = ({
  categories,
  contacts,
  logs,
  priorities,
}) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {categories?.map((category) => (
        <div className="grid grid-cols-1 gap-2 p-5" key={category.id}>
          <div>{category.name}</div>
          {contacts?.map(
            (contact) =>
              contact.category_id === category.id && (
                <ContactItem
                  contact={contact}
                  key={contact.id}
                  logs={logs?.filter((log) => log.contact_id === contact.id)}
                  priority={priorities?.filter((priority) => priority.id === contact.priority_id)[0]}
                />
              )
          )}
        </div>
      ))}
    </div>
  );
};
