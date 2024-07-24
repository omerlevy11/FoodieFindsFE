import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "../assets/SearchIcon";
import { getUserByName } from "../services/user-service";
import { IUser } from "../types";

export default function SearchBar() {
  const navigate = useNavigate();

  const list = useAsyncList({
    async load({ filterText }) {
      const users = await getUserByName(filterText);
      return {
        items: users,
      };
    },
  });

  const openOtherUserPage = async (userId: string) => {
    navigate({ to: `/home/${userId}` });
  };

  return (
    <Autocomplete
      classNames={{
        base: "w-7/12",
        listboxWrapper: "max-h-[320px]",
        selectorButton: "text-default-500",
      }}
      inputProps={{
        classNames: {
          input: "ml-1",
          inputWrapper: "h-[40px]",
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            "rounded-medium",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "dark:data-[hover=true]:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[hover=true]:bg-default-200",
            "data-[selectable=true]:focus:bg-default-100",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      popoverProps={{
        offset: 5,
        classNames: {
          base: "rounded-large",
          content: "p-1 border-small border-default-100 bg-background",
        },
      }}
      radius="full"
      variant="bordered"
      size="sm"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items as IUser[]}
      placeholder="Type to search..."
      onInputChange={list.setFilterText}
      startContent={<SearchIcon size={24} width={undefined} height={undefined} />}
      selectorIcon={null}
      isClearable={false}
    >
      {(item) => (
        <AutocompleteItem
          key={item.username}
          className="capitalize"
          startContent={
            <Avatar alt="user avatar" className="w-6 h-6" src={item.imgUrl} />
          }
          onClick={() => openOtherUserPage(item._id)}
        >
          {`${item.firstName} ${item.lastName}`}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
