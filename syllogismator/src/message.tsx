import { PropsWithChildren } from "react"

type MessageProps = PropsWithChildren<{
    author: string;
}>;

export const Message = ({author, children} : MessageProps) =>{
    return(
        <p>
            <b>{author}</b> : {children}
        </p>
    )
}