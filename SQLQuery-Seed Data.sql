USE [LeadershipCollective];
GO

set identity_insert [UserType] on
insert into [UserType] ([Id], [Name]) VALUES (1, 'Admin'), (2, 'Author');
set identity_insert [UserType] off

set identity_insert [ResourceType] on
insert into [ResourceType] ([Id], [Name]) VALUES (1, 'Book'), (2, 'Article'), (3, 'Consultant'), (4,'Facilitator'),(5, 'Video'), (6,'Conference');
set identity_insert [ResourceType] off

set identity_insert [Subject] on
insert into [Subject] ([Id], [Name]) VALUES (1, 'Budget'), (2, 'Strategic Plan'), (3, 'Workforce'), (4,'Leadership Development'),(5, 'Online Instruction'), (6, 'Diversity and Inclusion'), (7, 'Enrollment'), (8, 'Legistative Initiatives'), (9, 'Technology'), (10, 'Mental and Emotional Wellness');
set identity_insert [Subject] off

set identity_insert [UserProfile] on
insert into [UserProfile] ([Id], [FirstName], [LastName], [DisplayName], [Email],[DateCreated], [UserTypeId]) VALUES (1, 'Evangeline', 'Lilly', 'Kate', 'lilly42@mail.com', '2004-09-17', 2);
insert into [UserProfile] ([Id], [FirstName], [LastName], [DisplayName], [Email],[DateCreated], [UserTypeId]) VALUES (2, 'Matthew', 'Fox', 'Jack', 'foxman@mail.com', '2004-09-17', 1);
insert into [UserProfile] ([Id], [FirstName], [LastName], [DisplayName], [Email],[DateCreated], [UserTypeId]) VALUES (3, 'Josh', 'Holloway', 'Sawyer', 'sawyer@mail.com', '2004-09-17', 2);
insert into [UserProfile] ([Id], [FirstName], [LastName], [DisplayName], [Email],[DateCreated], [UserTypeId]) VALUES (4, 'Michael', 'Emerson', 'Ben', 'sneakyben@mail.com', '2004-09-17', 1);
insert into [UserProfile] ([Id], [FirstName], [LastName], [DisplayName], [Email],[DateCreated], [UserTypeId]) VALUES (5, 'Jorge', 'Garcia', 'Hugo', 'hurley@mail.com', '2004-09-17', 2);
insert into [UserProfile] ([Id], [FirstName], [LastName], [DisplayName], [Email],[DateCreated], [UserTypeId]) VALUES (6, 'Elizabeth', 'Mitchell', 'Juliet', 'julietta@mail.com', '2004-09-17', 2)
insert into [UserProfile] ([Id], [FirstName], [LastName], [DisplayName], [Email],[DateCreated], [UserTypeId]) VALUES (7, 'Mark', 'Pellegrino', 'Jacob', 'jake08@mail.com', '2004-09-17', 1);
insert into [UserProfile] ([Id], [FirstName], [LastName], [DisplayName], [Email],[DateCreated], [UserTypeId]) VALUES (8, 'Henry', 'Cusick', 'Desmond', 'des@mail.com', '2004-09-17', 2);
insert into [UserProfile] ([Id], [FirstName], [LastName], [DisplayName], [Email],[DateCreated], [UserTypeId]) VALUES (9, 'Emillie', 'Ravin', 'Claire', 'claire@mail.com', '2004-09-17', 2);
insert into [UserProfile] ([Id], [FirstName], [LastName], [DisplayName], [Email],[DateCreated], [UserTypeId]) VALUES (10, 'Michelle', 'Rodriguez', 'Ana', 'ana@mail.com', '2004-09-17', 2);
set identity_insert [UserProfile] off

set identity_insert [Template] on
insert into [Template] ([Id], [Title], [LinkAddress], [UserProfileId], [SubjectId]) VALUES (1, 'Highline College-Stragegic Plan','https://documents.highline.edu/highline/Highline-College-Mid-Cycle-Strategic-Plan-1718-2021.pdf', 1, 2), (2, 'Pikes Peak State College-Strategic Plan','https://www.pikespeak.edu/about/office-president/strategic-plan/_uploads-strategic-plans/PPCC_StrategicPlan2017_FINAL-Web.pdf', 2, 2);
set identity_insert [Template] off

set identity_insert [LeadershipEvent] on
insert into [LeadershipEvent] ([Id],[Title], [Date], [Location], [LinkAddress], [ImageLocation], [Content], [UserProfileId] ) VALUES (1,'InsightsEDU Conference','2023-03-7', 'Denver, CO', 'https://www.educationdynamics.com/insights/insightsedu-conference/?ads_cmpid=18355142795&ads_adid=142143968555&ads_matchtype=p&ads_network=g&ads_creative=622163569092&utm_term=higher%20education%20conference&ads_targetid=kwd-303095045661&utm_campaign=&utm_source=adwords&utm_medium=ppc&ttv=2&gclid=Cj0KCQiAyracBhDoARIsACGFcS5OFX9UIpm5WmPiboFCZPzPpgVKa9WrNGmUENwNJkxr4AujLB2Z1WwaAuQCEALw_wcB', NULL, 'Join hundreds of higher education marketing, admissions, and enrollment management professionals for the can’t-miss conference of the year. The 2023 conference will be hosted in Denver, Colorado with a wide array of speakers targeted to help higher education professionals navigate the current education landscape. The InsightsEDU conference is one of the few higher education conferences that focus exclusively on the adult learner enrolled in post-traditional education programs. Experience for yourself why this is the can’t-miss conference of the year for many higher education professionals. We’ll explore insights into today’s students, how to reach these students, and strategies for growing your post-traditional enrollments. Join us for Insights into Education with some of the leading minds in higher education marketing and enrollment management.', 2), (2, 'National Resource Center: The First Year Experience', '2023-02-03', 'Los Angeles, California', 'https://nrc.uts.sc.edu/fye/annual2023/', 'https://ellisonellery.com/wp-content/uploads/2022/09/NRC_First_Year_Experience-768x326.webp', 'The National Resource Center’s annual conference on the first-year experience focuses on the student experience, especially for current and incoming freshmen. Throughout the event, higher ed professionals swap stories, scenarios, and successes they’ve experienced to support first-year students’ development and success better.
Throughout the event, you’ll learn about a variety of topics, including:
Improving the first year
Creating stronger partnerships between students and schools
Student health issues
Bridging generational gaps
Faculty training
Teaching tools', 2);
set identity_insert [LeadershipEvent] off

set identity_insert [ConsultantRecommendation] on
insert into [ConsultantRecommendation] ([Id],[Content], [ResourceTypeId], [UserProfileId], [SubjectId], [Name], [Email], [PhoneNumber],[ServiceArea], [LinkAddress], [DateCreated]) VALUES (1, 'John is based out of Louisville, KY. John has a great presence, and created a comfortable dynamic for our reluctant participants.  We did executive team first,  and then expanded to the entirety of the faculty, staff, and student leadership.  John was reasonably priced and was very responsive to our culture.', 4, 2, 4, 'John Locke', 'locke@lost.mail', '481-516-2342','Louisville, KY','https://en.wikipedia.org/wiki/John_Locke_%28Lost%29', '2017-11-11'),  (2,'We used Kim Burns for our strategic planning facilitator.  She was flexible in structure, and focused on listening sessions and providing general structure.  She was a guide on the side, and did not even hint about telling us what to do.  We held the power in determining our path.  We had two data f2f, a few virtual, and a final presentation of findings (not the plan) f2f.  We then put the final pieces together. She is also helping us rewrite our Mission Statement. Kim is a great guide on the side, listener, and facilitator, but would not provide the larger data and process experience that some of the larger firms are currently doing.  I actually have found the larger firms to be off the mark, and frustrating.  I found Kim’s process perfect for where we are. Kim was the most affordable option I explored.', 3, 2, 2, 'Kim Burns', 'hello@drjunbruns.com', NULL, 'Huntington, WV','https://drkimburns.com/','2022-12-01' );
set identity_insert [ConsultantRecommendation] off

set identity_insert [ConsultantRecMessage] on
insert into [ConsultantRecMessage] ([Id], [Content], [ConsultantRecommendationId], [UserProfileId], [DateCreated]) VALUES (1, 'How often did your team get to meet with Kim Burns?', 2,10, '2022-12-02' ), (2, 'Kim met with our team two times so far.', 2, 2, '2022-12-02');
set identity_insert [ConsultantRecMessage] off





set identity_insert [MediaRecommendation]on
insert into [MediaRecommendation] ([Id], [Content], [ResourceTypeId], [UserProfileId], [SubjectId], [Title], [Author], [PublicationDate], [LinkAddress], [DateCreated])  VALUES (1, 'Influencer is my favorite leadership book, and is more appropriate for executives and middle managers, but could be valuable for front line workers.  This book explores how to really change behavior, and lead wide spread change.  Big picture thinkers will love this.  Non-big picture thinkers need it!', 1, 3, 4, 'Influencer', 'Patterson, Grenny, Maxfield, McMillan, Switzler', '2012-05-14', 'https://www.amazon.com/Influencer-Science-Leading-Change-Second/dp/0071808868/ref=asc_df_0071808868/?tag=hyprod-20&linkCode=df0&hvadid=266094129756&hvpos=&hvnetw=g&hvrand=6003481456127041609&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9009235&hvtargid=pla-434935341101&psc=1','2019-05-23');
set identity_insert [MediaRecommendation]off

set identity_insert [MediaRecMessage] on
insert into [MediaRecMessage] ([Id], [Content], [MediaRecommendationId], [UserProfileId], [DateCreated]) VALUES (1, 'How have you implemented ideas from this text?', 1,10, '2022-12-02' );
set identity_insert [MediaRecMessage] off