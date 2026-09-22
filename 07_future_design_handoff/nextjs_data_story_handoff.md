# Future Design Handoff — Next.js

This file is intentionally secondary to the research. It defines how the research can later translate into an interactive data story.

## Recommended stack
- Next.js
- TypeScript
- Tailwind CSS
- Recharts or D3 for charts
- Framer Motion for micro-interactions
- Data stored as static JSON/CSV initially

## Design principle
The interface should make the audience explore **trade-offs and differences**, not deliver a predetermined verdict.

## Information architecture
1. Intro / framing
2. Student AI-use landscape
3. What students use AI for
4. Benefits vs risks
5. Usage intensity and reported outcomes
6. Student voices / qualitative themes
7. Institutional support
8. Reflection / conclusion

## Interaction ideas
- Hover/tap chart points to reveal student/use-case context.
- Toggle between “benefit” and “concern” views.
- Slider from low to high AI-use intensity.
- Click a use case to filter associated outcomes.
- Quote cards that expand to show theme/context.
- Scroll-triggered chart transitions.
- Tooltip definitions for statistical terms.
- “What this does NOT prove” expandable caveat panels.

## Micro-interaction rules
- Use motion to explain change, not decorate.
- Keep interaction accessible by keyboard.
- Provide reduced-motion support.
- Never hide essential evidence behind animation.
- Always label sample, geography and year.

## Data contract
Every chart should carry:
- source;
- population;
- year;
- variable definition;
- calculation/aggregation;
- limitation.

## Future component ideas
`EvidenceCard`
`MetricCard`
`UseCaseFilter`
`ImpactSpectrum`
`StudentQuote`
`SourceDrawer`
`MethodologyPanel`
`CaveatPanel`
