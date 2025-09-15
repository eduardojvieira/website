---
publishDate: 2025-03-21T00:00:00Z
author: Eduardo Vieira
title: "Evaluating Custom RISC-V Industrial Controllers"
excerpt: "What I learned after prototyping a RISC-V based industrial controller, from determinism testing to long-term maintainability."
image: '~/assets/images/industrial-automation.jpg'
category: Industrial Automation
tags:
  - risc-v
  - embedded
  - industrial
metadata:
  canonical: https://eduardovieira.dev/custom-risc-v-industrial-controllers
---

# Evaluating Custom RISC-V Industrial Controllers

I was recently engaged to explore whether a custom RISC-V platform could replace aging proprietary controllers in a specialty packaging line. Below is the evaluation framework we used and the key lessons learned while prototyping the stack.

## 1. Business Motivation

- **Cost Pressure:** OEM replacement boards cost more than $3,000 and had 16-week lead times.
- **Flexibility:** The customer needed to adapt machine recipes frequently and wanted a platform amenable to modern toolchains (Git, CI/CD, containerized deployments).
- **Openness:** Avoid vendor lock-in and licensing surprises when scaling internationally.

## 2. Hardware Selection Criteria

We benchmarked three RISC-V SoMs that offered industrial temperature ratings:

| Board | CPU | IO Options | Industrial Certification | Notes |
| --- | --- | --- | --- | --- |
| Vendor A SoM | 4-core RV64 | 2x Ethernet, 4x CAN, 1x PCIe | CE/UL pending | Strong partner support |
| Vendor B Module | Dual-core RV32 | EtherCAT, RS-485, isolated IO | CE/UL listed | Limited RAM |
| Vendor C Dev Kit | 8-core RV64 | Gigabit Ethernet, USB, SPI | None | Great performance but lacks certifications |

We chose **Vendor B** for pilot runs because the integrated isolated IO reduced our PCB work, even though memory was constrained.

## 3. Software Stack Overview

- **RTOS:** Zephyr with the Time-Sensitive Networking (TSN) add-on for deterministic Ethernet.
- **Middleware:** FreeModbus, custom EtherCAT master, and a lightweight MQTT client.
- **Application Layer:** Structured text translated to C using PLCopen XML exports, then compiled with GCC.
- **Tooling:** GitLab CI pipelines cross-compile firmware, run static analysis (cppcheck), and publish artifacts to an internal registry.

## 4. Determinism and Real-Time Behavior

I instrumented the firmware with GPIO toggles and measured jitter with a digital scope. Results:

- **Cycle Time:** 2 ms task executed within ±60 µs jitter under nominal load.
- **Network Load:** Enabling MQTT at QoS 1 increased jitter to ±120 µs; we mitigated by offloading MQTT to a secondary core.
- **Interrupt Latency:** Worst-case 8 µs when handling EtherCAT PDOs; acceptable for the machine’s servo loops.

## 5. Industrial Hardening Considerations

- **Enclosure:** DIN-rail carrier with conformal coating to handle humidity.
- **Power:** Dual redundant 24 VDC inputs with reverse polarity protection.
- **Diagnostics:** Added a dedicated UART console for maintenance and a secure bootloader supporting signed firmware updates.
- **Cybersecurity:** TPM 2.0 module for key storage, mutual TLS for MQTT, and remote attestation integrated with Azure DPS.

## 6. Integration with Existing Infrastructure

To avoid rewriting the HMI, we exposed the same OPC UA nodeset the original controller used. A translation layer mapped internal tags to OPC UA variables, and the existing SCADA system connected without changes.

## 7. Total Cost of Ownership

| Item | Custom RISC-V | Legacy Replacement |
| --- | --- | --- |
| Hardware BOM | $620 | $3,050 |
| Firmware Development (estimated) | $45k | $0 (off-the-shelf) |
| Certification | $12k | Included |
| Annual Support | $6k | $18k |

Break-even occurred in year three once the customer considered spares and reduced downtime. The intangible benefit: complete control over the roadmap and the ability to patch vulnerabilities on our own schedule.

## 8. Final Verdict

Custom RISC-V controllers are not a drop-in answer for every factory, but they shine when:

- You need specialized IO combinations or deterministic networking features.
- The organization is ready to treat control firmware like modern software with DevOps practices.
- Lifecycle cost and supply chain resilience outweigh the comfort of off-the-shelf PLCs.

For broader adoption, invest early in documentation, automated testing, and training maintenance staff. With those pillars in place, RISC-V can become a competitive differentiator in industrial automation programs.
