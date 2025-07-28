import React, { FC, ReactNode } from "react";
import styles from '../../../modules/Form.module.css'
type ButtonFProps = {
    content: ReactNode;
    event: (e: any) => void,
    classname?: string | undefined
}


const ButtonF: FC<ButtonFProps> = ({content, event, classname}) =>
  {
    return (
    <button onClick={event}  className={classname || styles.buttonf}>{content}</button>
    )
  }

  export default ButtonF;