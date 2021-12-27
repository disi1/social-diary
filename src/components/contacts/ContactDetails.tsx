import { Contact } from "../../lib/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Priority } from "../../lib/priority";
import { Category } from "../../lib/category";
import { Log } from "../../lib/log";

interface ContactDetailsProps {
  contact: Contact;
  priority: Priority;
  category: Category;
  lastLogEntry: Log | undefined;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  contact,
  category,
  priority,
  lastLogEntry,
}) => {
  return (
    <div className="flex">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-gray-300" />
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex justify-between leading-normal">
        <div className="items-center mb-8">
          <div className="mb-2 flex items-center">
            <div className="text-gray-700 font-bold text-xl mr-2">
              {contact.name}
            </div>
            {
              <FontAwesomeIcon
                icon={faCircle}
                color={lastLogEntry ? "green" : "gray"}
              />
            }
          </div>
          <p className="text-gray-700 text-base">{contact.relationship}</p>
        </div>
        <div className="flex flex-col items-center">
          <div>{`Priority: ${priority.name}`}</div>
        </div>
      </div>
    </div>
  );
};
