---
layout: post
title: "Minicourse: On Decision Problems in Groups"
categories: talks
modified_date: 2025-02-15
author:
  - Alex Bishop
sitemap:
    lastmod: 2025-02-15T05:03:19+11:00
---

This post details a short minicourse that I wll be giving at the University of Geneva on the topic of volume growth in finitly-generated groups.
This course consists of 2 talks, on 21 and 22 May 2024.
The target audience for these talks is Master's students in mathematics and related fields.

## Abstract

In 1911, Max Dehn considered the word problem, conjugacy problem and isomorphism problem for finitely presented groups. Motivation for these problems can be found in algebraic topology. In particular, the word problem allows us to verify if a curve is contractable; the conjugacy problem enables us to check if two given curves are free homotopic; and the isomorphism problem gives us a method to confirm that two spaces are not isomorphic. Moreover, in the case of knot theory, the isomorphism problem allows us to identify if a given knot is the unknot. These three problems, studied by Dehn, are fundamental to the study of group theory and are all examples of decision problems of groups.

In our first talk, we focus on the word problem for groups. Solutions to this problem are important as they allow us to perform calculations and decide on the equality of group elements. We begin by studying examples and classes of groups for which the word problem is easily solvable. In fact, under certain interpretations of random group presentations, almost all finitely presented groups have such an easily solvable word problem. We end this talk by showing that there exist finitely presented groups with undecidable word problems, that is, there is no algorithm that can correctly determine if any given product of group generators is the group identity.

In our second talk, we study the class of group properties known as Markov properties. Examples of such properties include being the trivial group, finite, abelian, amenable, torsion-free, having a solvable word problem, or having a solvable conjugacy problem. Using the unsolvability of the word problem from our first talk, we show that no algorithm can decide if a given finitely presented group has a particular Markov property. For example, it is impossible, in general, to decide if a given finitely presented group is abelian.

## Notes

PDF versions of the two talks are available as follows:

 - [Talk 1: Definitions and Word Problems](https://github.com/alexbishop/unige_minicourse_2024_decision_problems/releases/download/v2.0.3/talk1.pdf){:target="_blank" rel="noopener noreferrer"}
    * Basic definitions
    * Gives examples of cases where the word problem is easily solvable
    * **Gives a simple model of computation and studies non-computability (by the halting problem)**
    * Definition and introduction to van Kampen diagrams
    * **Proves Greendlinger's lemma for group with metric small cancelation condition C'(1/6)**
    * **Proves that there exists a finitely presentable group with non-computable word problem**
 - [Talk 2: Markov Properties](https://github.com/alexbishop/unige_minicourse_2024_decision_problems/releases/download/v2.0.3/talk2.pdf){:target="_blank" rel="noopener noreferrer"}
    * Deines Markov properties for groups
    * Gives some basic examples
    * **Proves the Adian–Rabin theorem which states that Markov properties are non-computable**

You can also find the LaTeX and PDFs for my notes [here on GitHub](https://github.com/alexbishop/unige_minicourse_2024_decision_problems){:target="_blank" rel="noopener noreferrer"}.

