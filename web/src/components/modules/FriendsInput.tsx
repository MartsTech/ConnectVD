import { FriendsQuery } from "generated/graphql";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { setHookType } from "@type/setHookType";
import PreviewCard from "@element/PreviewCard";
import Avatar from "@element/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    background: "#242c37",
  },
});

interface FriendsInputProps {
  data?: FriendsQuery;
  receiver: string;
  setReceiver: setHookType;
}

const FriendsInput: React.FC<FriendsInputProps> = ({
  data,
  receiver,
  setReceiver,
}) => {
  const classes = useStyles();

  return (
    <>
      {data && (
        <Autocomplete
          className="flex-grow flex rounded-lg"
          options={data.friends}
          classes={{ paper: classes.paper }}
          getOptionLabel={(option) => option.user.email}
          renderOption={(option) => (
            <div className="w-full">
              <PreviewCard
                Icon={
                  <Avatar
                    src={option.user.photoUrl}
                    status={option.user.status}
                  />
                }
                title={option.user.displayName}
                onClick={() => {
                  setReceiver(option.user.email);
                }}
              />
            </div>
          )}
          renderInput={(params) => (
            <div className="flex-grow flex" ref={params.InputProps.ref}>
              <input
                name="to"
                placeholder="To"
                type="email"
                value={receiver}
                {...params.inputProps}
                className="flex-grow py-3 px-4 mx-10 rounded-8 text-primary-100 
                      focus:outline-none bg-primary-600 rounded-lg"
              />
            </div>
          )}
        />
      )}
    </>
  );
};

export default FriendsInput;
