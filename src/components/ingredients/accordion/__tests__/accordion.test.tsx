import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../index";

describe("Accordion", () => {
  it("should render", () => {
    const { container } = render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(container.innerHTML).not.toBe("");
  });
});
