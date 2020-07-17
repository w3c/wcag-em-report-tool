# Decisions made project rebuild


---

## Initial - [2020/07/16]

### Decision to be Made

> In this section, describe the decision that must be made. This should be very clearly stated, but succinct. This is an executive brief of what recipients of the document are being asked to decide.

Choose a framework or direction to start with rebuilding the WCAG Report Tool.

### Current Status

> This section must include the who, what, when and where of the situation requiring a decision. You should also provide the history of how you came to the issue at hand. While your decision-makers need to understand the background, this requires a careful balance of providing enough history without going into exhaustive and unnecessary details. A good litmus test for content to be included here is to simply ask yourself, “is this information relevant to the decision?” In other words, would knowing the piece of history or current status detail influence the decision maker one way or another? If the answer is yes, then it is relevant enough to be included.

The current tool is build with a complex, outdated framework (AngularJS) and unmaintained codebase.

There are a great deal of feature requests awaiting to be integrated. Most of the requests are added by accessibility experts all over the world working with the tool. (contribution and internationalization)

For a rebuild we want to take out complexity and focus on maintainability. Other topics that have been talked about are customization / integration, internationalization and shared code / contribution.

The tool is hosted on the WAI website and should integrate well within this ecosystem. (integration)

The tool is used and integrated in workflows of Accessibility experts. (Customization)

The WAI is in progress creating a similar tool; ATAG Report Tool. (shared code? same framework?)

### Options

> Be sure to capture all relevant decisions, with an emphasis on the relevant part. This section is not to list every possible variation anyone could ever dream up. Instead, list genuine options that the decision makers could consider selecting. Depending upon the nature of your particular environment, you may want to include a section of “excluded options”. In this case, you would briefly list options that were quickly ruled out and a short statement of explanation.

> For each option, explain the option in detail first. Then, in bullet or similar quick-reference fashion, highlight the positives and negatives (I prefer the position of “Benefits” and “Risks”) of each option.

1. Sollution focussed

  This option makes sure we start building in setup A, may progress with B and possibly end up with A again or a totally different C setup.

  This kind of setup is great at starting with what is needed and may evolve looking at the issues we try to solve. When it becomes clear that certain features will not be able to be solved we can then move on to another approach or extend the current with new needs.

  **Benefits**:
  - Focussed on adressing issues over technology
  - Practical approach
  - Flexibility

  **Risks**:
  - More coding involved, may end up with multiple configurations
  - May need to refactor more changing implementation.

2. Technology focussed

  This option chooses setup / framework X to build the application with and stick with it during and finalizing the application with.

  This kind of setup locks into an ecosystem. You can start building the application and know what tools are available. Issues are adressed according to how the techstack is built.

  **Benefits**:
  - Small refactoring time
  - Initial project boilerplate

  **Risks**:
  - Hard to scale up or down
  - Issues may be harder to tackle, Limited to the tech stack.
  - Requiring non framework code to get edge cases to work
  - Having to decline feature requests, because they are not possible within the current framework / setup.

  Excluded options:

  - MVC type setup; AngularJS, current setup is a mvc, which slows down development due to complexity. This is ruled out. May be beneficial for large scale applications.

### Recommendation

> This is the recommendation of the team or individual submitting the decision document for consideration. It should include a reference back to the specific option being recommended (Option #1, 2 or 3…). In addition, the reasoning for this recommendation should be captured. For example, you should explain why the recommended option is better than others. Logic such as lowest overall risk or cost are obvious reasons. Others may include a balance of risk and costs or time sensitivity.

Recommended option 1. This option offers the flexibility that is required to deal with multiple architectural wishes.

Option 2 would be more logical if the wishes are more technical.



### Decision

> Here, you document the decision the team agreed to. If you’ve done your legwork prior to submission, you may anticipate the chosen option. In this case, you may want to document the chosen option (anticipated) when presenting the document for signatures / approvals.

Option 1; sollution focussed

### Next Steps

> Based on the decision being made, what actions must happen next? This may not be required in all cases, but it is often helpful in ensuring the right actions happen in a timely manner. In addition, key decisions that require documentation like this often stem from a problem and include lessons learned or opportunities to avoid a recurrence. This section may also be useful for capturing this information.

Make more specific decisions on:

- Best practices implementation, to support for code quality, maintainability and contribution.
