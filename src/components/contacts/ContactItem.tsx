import { faCalendar, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Contact } from "../../lib/contact";

interface ContactItempProps {
  contact: Contact;
}

export const ContactItem: React.FC<ContactItempProps> = ({ contact }) => {
  return (
    <div className="flex">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-gray-300"/>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="items-center mb-8">
          <div className="mb-2 flex items-center">
            <div className="text-gray-700 font-bold text-xl mr-2">
              {contact.name}
            </div>
            <FontAwesomeIcon icon={faCircle} color="green" />
          </div>
          <p className="text-gray-700 text-base">{contact.relationship}</p>
        </div>
        {/*<div className="flex items-center">
          <FontAwesomeIcon icon={faCalendar} color={"gray"} className="mr-2"/>
          <div className="text-sm">
            <p className="text-gray-600">{contact.lastEntry}</p>
          </div>
        </div>*/}
      </div>
    </div>
  );
};
