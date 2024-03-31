import style from './CardUsers.module.scss';
import { useGetUsersQuery } from "../../entities/users/api/usersApi.ts";
import Button from "../../UI/button/CustomButton.tsx";
import {CircularProgress, Tooltip, tooltipClasses} from "@mui/material";
import React, {useState} from 'react';



const generateTooltip = (placement: React.ComponentProps<typeof Tooltip>['placement'], title: string, content: React.ReactElement) => (
    <Tooltip
        placement={placement}
        followCursor={true}
        slotProps={{
            tooltip: {
                sx: {
                    [`&.${tooltipClasses.tooltip}`]: {
                        backgroundColor: "black",
                        color: "white",
                        fontSize: '16px',
                    }
                }
            }
        }}
        title={title}
    >
        {content}
    </Tooltip>
);

const CardUsers = () => {
    const [count, setCount] = useState(6);
    const [showMore, setShowMore] = useState(true);


    const { data } = useGetUsersQuery({ page: 1, count: count });

 const showMoreHandler = () => {
     if (showMore) {
     setCount(count + 3)
     setShowMore(!showMore)
     } else {
         setCount(count - 3)
         setShowMore(!showMore)
     }

    }


    return (

        <div id={"cardId"}
            className={style.CardUsers}>
            <h2 className={style.CardUsersHeader}>
                Working with GET request
            </h2>
            { !data ? <CircularProgress
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        my: 30,
                    }}
                    size={100} />
                :
            <div
                className={style.ContainerCardMain}>
                {data?.users.map((users) => (
                    <div className={style.ContainerCard}
                         key={users.id}>
                        <img src={users.photo} alt="PhotoUser" />

                        <div className={style.CardText}>
                            {generateTooltip("bottom-start", users.name, <p>{users.name}</p>)}
                            {generateTooltip("bottom-start", users.position, <p>{users.position}</p>)}
                            {generateTooltip("bottom-start", users.email, <p>{users.email}</p>)}
                            {generateTooltip("bottom-start", users.phone, <p>{users.phone}</p>)}
                        </div>
                    </div>
                ))}
            </div>
            }
            <Button
                onClick={showMoreHandler}
                className={style.ButtonCard}>
                {!showMore ? 'Show less' : 'Show more'}
            </Button>
        </div>
    );
};

export default CardUsers;
