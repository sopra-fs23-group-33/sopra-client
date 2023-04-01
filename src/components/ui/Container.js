import "styles/ui/Container.scss";

export const Container = props => (
    <div {...props}
         className={`container ${props.className ?? ''}`}>
        {props.children}
    </div>
);
