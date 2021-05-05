import Avatar from "@element/Avatar";
import PreviewCard from "@element/PreviewCard";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { setHookType } from "@type/setHookType";
import { FriendsQuery } from "generated/graphql";

const useStyles = makeStyles({
  paper: {
    background: "#242c37",
    color: "#dee3ea",
  },
});

interface FriendsInputProps {
  data?: FriendsQuery;
  receiver: string;
  setReceiver: setHookType;
  name: string;
}

const FriendsInput: React.FC<FriendsInputProps> = ({
  data,
  receiver,
  setReceiver,
  name,
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
            <div className="w-full text-primary-100">
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
                {...params.inputProps}
                name={name}
                type="email"
                value={receiver}
                className="flex-grow py-3 px-4 rounded-8 text-primary-100 
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
