import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

// Single List Item
const SingleListItem = memo(({ index, isSelected, onClick, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      onClick={onClick}
    >
      {/* onClick={onClickHandler(index)} Incorrect One */}
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  // const [setSelectedIndex, selectedIndex] = useState(); Incorrect One
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = useCallback(
    (index) => {
      setSelectedIndex(index === selectedIndex ? null : index);
    },
    [selectedIndex]
  );

  const listItems = useMemo(
    () =>
      items.map(({ text }, index) => (
        <SingleListItem
          key={index}
          index={index}
          isSelected={selectedIndex === index}
          // isSelected={selectedIndex} Incorrect One
          onClick={() => handleClick(index)}
          text={text}
        />
      )),
    [items, handleClick, selectedIndex]
  );

  return <ul style={{ textAlign: "left" }}>{listItems}</ul>;
});
// PropTypes.array(PropTypes.shapeOf({ text: PropTypes.string.isRequired })) Incorrect One
List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default List;
