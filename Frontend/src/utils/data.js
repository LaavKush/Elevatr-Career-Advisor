export default [
  {
    company: "Tata Consultancy Services (TCS)",
    offCampus: {
      eligibility: ["B.E.","B.Tech","M.E.","M.Tech","MCA","M.Sc"],
      cgpaCutoff: 6.0,
      ctc: "3.36 LPA",
      roles: ["Assistant System Engineer (ASE)"],
      rounds: [
        { name: "Online Test (TCS NQT)", topics: ["Numerical Ability","Verbal Ability","Reasoning Ability","Programming Logic","Coding"] },
        { name: "Technical Interview", topics: [
            "Core subjects (OS, DBMS, OOPS)",
            "Programming basics",
            "Projects",
            { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Hashing","Dynamic Programming"] },
            { CS_Fundamentals: ["Operating Systems","DBMS","Networking","Computer Architecture","Software Engineering","OOPS Concepts"] }
          ] 
        },
        { name: "HR Interview", topics: ["Communication skills","Behavioral questions","Willingness to relocate"] }
      ]
    },
    roles: [
      {
        role: "Assistant System Engineer (ASE)",
        eligibility: ["B.E.","B.Tech","M.E.","M.Tech","MCA","M.Sc"],
        cgpaCutoff: 6.0,
        ctc: "3.36 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Online Test (TCS NQT)", topics: ["Numerical Ability","Verbal Ability","Reasoning Ability","Programming Logic","Coding"] },
          { name: "Technical Interview", topics: [
              "Core subjects (OS, DBMS, OOPS)",
              "Programming basics",
              "Projects",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Hashing","Dynamic Programming"] },
              { CS_Fundamentals: ["Operating Systems","DBMS","Networking","Computer Architecture","Software Engineering","OOPS Concepts"] }
            ] 
          },
          { name: "HR Interview", topics: ["Communication skills","Behavioral questions","Willingness to relocate"] }
        ]
      },
      {
        role: "Business Analyst",
        eligibility: ["B.E.","B.Tech","BBA","MBA"],
        cgpaCutoff: 6.0,
        ctc: "3.5 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Online Test", topics: ["Quantitative Ability","Logical Reasoning","English"] },
          { name: "Technical/Domain Interview", topics: [
              "Requirement Gathering",
              "Business Analysis Concepts",
              { DSA: ["Arrays","Strings","Linked List"] },
              { CS_Fundamentals: ["DBMS","Networking","OOPS"] }
            ] 
          },
          { name: "HR Interview", topics: ["Behavioral questions","Leadership Skills","Teamwork"] }
        ]
      }
    ]
  },
  {
    company: "HCL Technologies",
    offCampus: {
      eligibility: ["B.E.","B.Tech","CSE","ECE","EEE","IT"],
      cgpaCutoff: 6.5,
      ctc: "3.5-3.8 LPA",
      roles: ["Graduate Trainee Engineer","System Engineer"],
      rounds: [
        { name: "Online Test", topics: ["Aptitude","Logical Reasoning","English","Technical MCQs"] },
        { name: "Technical Interview", topics: [
            "Core language concepts (C++/Java/Python)",
            { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Hashing","Dynamic Programming"] },
            { CS_Fundamentals: ["OOPS","DBMS","Operating Systems","Networking","Computer Architecture"] },
            "Projects"
          ] 
        },
        { name: "HR Interview", topics: ["Behavioral questions","Strengths and weaknesses","Aspirations"] }
      ]
    },
    roles: [
      {
        role: "Graduate Trainee Engineer",
        eligibility: ["B.E.","B.Tech","CSE","ECE","EEE","IT"],
        cgpaCutoff: 6.5,
        ctc: "3.5 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Online Test", topics: ["Aptitude","Reasoning","English","Technical MCQs"] },
          { name: "Technical Interview", topics: [
              "Core language concepts (C++/Java/Python)",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Hashing","Dynamic Programming"] },
              { CS_Fundamentals: ["OOPS","DBMS","Operating Systems","Networking","Computer Architecture"] },
              "Projects"
            ] 
          },
          { name: "HR Interview", topics: ["Behavioral questions","Strengths and weaknesses","Aspirations"] }
        ]
      },
      {
        role: "System Engineer",
        eligibility: ["B.E.","B.Tech","CSE","IT"],
        cgpaCutoff: 6.5,
        ctc: "3.8 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Online Test", topics: ["Aptitude","Logical Reasoning","Technical MCQs"] },
          { name: "Technical Interview", topics: [
              "Programming and Projects",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs"] },
              { CS_Fundamentals: ["Operating Systems","DBMS","Networking"] }
            ] 
          },
          { name: "HR Interview", topics: ["Communication","Teamwork","Behavioral questions"] }
        ]
      }
    ]
  },
  {
    company: "Tech Mahindra",
    offCampus: {
      eligibility: ["B.E.","B.Tech","CSE","IT","ECE"],
      cgpaCutoff: 6.5,
      ctc: "3.25-3.3 LPA",
      roles: ["Software Engineer","Testing Engineer"],
      rounds: [
        { name: "Online Test", topics: ["Aptitude","Logical Reasoning","Coding"] },
        { name: "Technical Interview 1", topics: [
            "Programming fundamentals","OS","DBMS","Networking",
            { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Hashing","Dynamic Programming"] },
            { CS_Fundamentals: ["Operating Systems","DBMS","Networking","OOPS","Computer Architecture"] }
          ] 
        },
        { name: "Technical Interview 2", topics: [
            "Projects","Technology stack","Problem-solving",
            { DSA: ["Recursion","Greedy Algorithms","Backtracking","Dynamic Programming"] },
            { CS_Fundamentals: ["Software Engineering","OOPS","Networking","Database concepts"] }
          ] 
        },
        { name: "HR Interview", topics: ["Career goals","Work-life balance","Company knowledge"] }
      ]
    },
    roles: [
      {
        role: "Software Engineer",
        eligibility: ["B.E.","B.Tech","CSE","IT","ECE"],
        cgpaCutoff: 6.5,
        ctc: "3.25 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Online Test", topics: ["Aptitude","Logical Reasoning","Coding"] },
          { name: "Technical Interview 1", topics: [
              "Programming fundamentals","OS","DBMS","Networking",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Hashing","Dynamic Programming"] },
              { CS_Fundamentals: ["Operating Systems","DBMS","Networking","OOPS","Computer Architecture"] }
            ] 
          },
          { name: "Technical Interview 2", topics: [
              "Projects","Technology stack","Problem-solving",
              { DSA: ["Recursion","Greedy Algorithms","Backtracking","Dynamic Programming"] },
              { CS_Fundamentals: ["Software Engineering","OOPS","Networking","Database concepts"] }
            ] 
          },
          { name: "HR Interview", topics: ["Career goals","Work-life balance","Company knowledge"] }
        ]
      },
      {
        role: "Testing Engineer",
        eligibility: ["B.E.","B.Tech","CSE","IT","ECE"],
        cgpaCutoff: 6.5,
        ctc: "3.3 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Online Test", topics: ["Aptitude","Logical Reasoning","Basic Coding"] },
          { name: "Technical Interview", topics: [
              "Manual & Automation Testing concepts",
              { DSA: ["Arrays","Strings","Linked List"] },
              { CS_Fundamentals: ["OOPS","DBMS","Operating Systems"] }
            ] 
          },
          { name: "HR Interview", topics: ["Teamwork","Behavioral questions","Career Goals"] }
        ]
      }
    ]
  },
  {
    company: "Accenture",
    offCampus: {
      eligibility: ["B.E.","B.Tech","MCA","M.Sc","BBA","MBA"],
      cgpaCutoff: 6.5,
      ctc: "4-4.5 LPA",
      roles: ["Associate Software Engineer","Business Analyst"],
      rounds: [
        { name: "Cognitive and Technical Assessment", topics: ["Logical Reasoning","Abstract Reasoning","Common Applications and MS Office","Pseudo Code","Networking, Security and Cloud"] },
        { name: "Coding Assessment", topics: [
            "Coding challenges (C, C++, Java, Python, .NET)",
            { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Hashing","Dynamic Programming"] },
            { CS_Fundamentals: ["OOPS","DBMS","Operating Systems","Networking","Software Engineering"] }
          ] 
        },
        { name: "Communication Assessment", topics: ["Grammar","Vocabulary","Fluency"] }
      ]
    },
    roles: [
      {
        role: "Associate Software Engineer",
        eligibility: ["B.E.","B.Tech","MCA","M.Sc"],
        cgpaCutoff: 6.5,
        ctc: "4.5 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Cognitive and Technical Assessment", topics: ["Logical Reasoning","Abstract Reasoning","Common Applications and MS Office","Pseudo Code","Networking, Security and Cloud"] },
          { name: "Coding Assessment", topics: [
              "Coding challenges (C, C++, Java, Python, .NET)",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Hashing","Dynamic Programming"] },
              { CS_Fundamentals: ["OOPS","DBMS","Operating Systems","Networking","Software Engineering"] }
            ] 
          },
          { name: "Communication Assessment", topics: ["Grammar","Vocabulary","Fluency"] }
        ]
      },
      {
        role: "Business Analyst",
        eligibility: ["B.E.","B.Tech","BBA","MBA"],
        cgpaCutoff: 6.5,
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Online Test", topics: ["Quantitative Ability","Logical Reasoning","English"] },
          { name: "Domain/Technical Interview", topics: [
              "Requirement Gathering","Business Analysis Concepts",
              { DSA: ["Arrays","Strings","Linked List"] },
              { CS_Fundamentals: ["DBMS","Networking","OOPS"] }
            ] 
          },
          { name: "HR Interview", topics: ["Leadership Skills","Teamwork","Behavioral questions"] }
        ]
      }
    ]
  },
  {
    company: "Mindtree (LTI)",
    offCampus: {
      eligibility: ["B.E.","B.Tech","CSE","IT","ECE"],
      cgpaCutoff: 6.5,
      ctc: "4-4.2 LPA",
      roles: ["Software Engineer","System Engineer"],
      rounds: [
        { name: "Online Test", topics: ["Quantitative Ability","Logical Reasoning","Verbal Ability","Coding"] },
        { name: "Technical Interview", topics: [
            "Projects",
            { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Hashing","Dynamic Programming"] },
            { CS_Fundamentals: ["Operating Systems","DBMS","Networking","OOPS","Computer Architecture","Software Engineering"] }
          ] 
        },
        { name: "HR Interview", topics: ["Career goals","Commitment","Work culture fit"] }
      ]
    },
    roles: [
      {
        role: "Software Engineer",
        eligibility: ["B.E.","B.Tech","CSE","IT","ECE"],
        cgpaCutoff: 6.5,
        ctc: "4 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Online Test", topics: ["Quantitative Ability","Logical Reasoning","Verbal Ability","Coding"] },
          { name: "Technical Interview", topics: [
              "Projects",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Hashing","Dynamic Programming"] },
              { CS_Fundamentals: ["Operating Systems","DBMS","Networking","OOPS","Computer Architecture","Software Engineering"] }
            ] 
          },
          { name: "HR Interview", topics: ["Career goals","Commitment","Work culture fit"] }
        ]
      },
      {
        role: "System Engineer",
        eligibility: ["B.E.","B.Tech","CSE","IT"],
        cgpaCutoff: 6.5,
        ctc: "4.2 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Online Test", topics: ["Aptitude","Logical Reasoning","Technical MCQs"] },
          { name: "Technical Interview", topics: [
              "Programming and Projects",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs"] },
              { CS_Fundamentals: ["Operating Systems","DBMS","Networking"] }
            ] 
          },
          { name: "HR Interview", topics: ["Behavioral questions","Teamwork","Company Knowledge"] }
        ]
      }
    ]
  },
  {
    company: "Infosys",
    offCampus: {
      eligibility: ["B.E.","B.Tech","MCA","M.Sc"],
      cgpaCutoff: 6.0,
      ctc: "3.6-4 LPA",
      roles: ["System Engineer","Software Engineer"],
      rounds: [
        { name: "Aptitude Test", topics: ["Quantitative Ability","Logical Reasoning","Verbal Ability"] },
        { name: "Coding Test", topics: ["Programming Logic","DSA basics","Problem Solving"] },
        { name: "Technical Interview", topics: [
            "Projects","OOPS","DBMS","OS","Networking",
            { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Dynamic Programming"] }
          ] 
        },
        { name: "HR Interview", topics: ["Communication","Behavioral questions","Leadership Skills"] }
      ]
    },
    roles: [
      {
        role: "System Engineer",
        eligibility: ["B.E.","B.Tech","MCA","M.Sc"],
        cgpaCutoff: 6.0,
        ctc: "3.6 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Aptitude Test", topics: ["Quantitative Ability","Logical Reasoning","Verbal Ability"] },
          { name: "Coding Test", topics: ["Programming Logic","DSA basics","Problem Solving"] },
          { name: "Technical Interview", topics: [
              "Projects","OOPS","DBMS","OS","Networking",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Dynamic Programming"] }
            ] 
          },
          { name: "HR Interview", topics: ["Communication","Behavioral questions","Leadership Skills"] }
        ]
      },
      {
        role: "Software Engineer",
        eligibility: ["B.E.","B.Tech","CSE","IT"],
        cgpaCutoff: 6.0,
        ctc: "4 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Aptitude Test", topics: ["Quantitative Ability","Logical Reasoning","Verbal Ability"] },
          { name: "Coding Test", topics: ["Programming Logic","DSA basics","Problem Solving"] },
          { name: "Technical Interview", topics: [
              "Projects","OOPS","DBMS","OS","Networking",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Dynamic Programming"] }
            ] 
          },
          { name: "HR Interview", topics: ["Communication","Behavioral questions","Leadership Skills"] }
        ]
      }
    ]
  },
  {
    company: "Wipro",
    offCampus: {
      eligibility: ["B.E.","B.Tech","MCA","M.Sc"],
      cgpaCutoff: 6.0,
      ctc: "3.6-3.8 LPA",
      roles: ["Software Engineer","System Engineer"],
      rounds: [
        { name: "Aptitude Test", topics: ["Quantitative Ability","Logical Reasoning","Verbal Ability"] },
        { name: "Coding Test", topics: ["Programming Logic","DSA basics","Problem Solving"] },
        { name: "Technical Interview", topics: [
            "Projects","OOPS","DBMS","OS","Networking",
            { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Dynamic Programming"] }
          ] 
        },
        { name: "HR Interview", topics: ["Communication","Behavioral questions","Leadership Skills"] }
      ]
    },
    roles: [
      {
        role: "Software Engineer",
        eligibility: ["B.E.","B.Tech","MCA","M.Sc"],
        cgpaCutoff: 6.0,
        ctc: "3.6 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Aptitude Test", topics: ["Quantitative Ability","Logical Reasoning","Verbal Ability"] },
          { name: "Coding Test", topics: ["Programming Logic","DSA basics","Problem Solving"] },
          { name: "Technical Interview", topics: [
              "Projects","OOPS","DBMS","OS","Networking",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Dynamic Programming"] }
            ] 
          },
          { name: "HR Interview", topics: ["Communication","Behavioral questions","Leadership Skills"] }
        ]
      },
      {
        role: "System Engineer",
        eligibility: ["B.E.","B.Tech","CSE","IT"],
        cgpaCutoff: 6.0,
        ctc: "3.8 LPA",
        modeOfOffer: "On-Campus",
        interviewRounds: [
          { name: "Aptitude Test", topics: ["Quantitative Ability","Logical Reasoning","Verbal Ability"] },
          { name: "Coding Test", topics: ["Programming Logic","DSA basics","Problem Solving"] },
          { name: "Technical Interview", topics: [
              "Projects","OOPS","DBMS","OS","Networking",
              { DSA: ["Arrays","Strings","Linked List","Stacks & Queues","Trees","Graphs","Dynamic Programming"] }
            ] 
          },
          { name: "HR Interview", topics: ["Communication","Behavioral questions","Leadership Skills"] }
        ]
      }
    ]
  }
];
