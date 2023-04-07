import React, { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

export default function Example () {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover Title</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <button type="button" className="btn btn-secondary" onClick={handleClick}>
        Click me to see
      </button>
    </OverlayTrigger>
  );
};

