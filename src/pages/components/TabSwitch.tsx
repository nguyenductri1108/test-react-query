type TCssUnit = "rem" | "px" | "em";

interface TProps {
    width: `${number}${TCssUnit}`;
}

const TabSwitch: React.FC<TProps> = ({ width }) => {
    return (
        <div style={{ position: "relative", height: "50px", width: width }}>
            <div className="abc" style={{}}></div>;
        </div>
    );
};

export default TabSwitch;
