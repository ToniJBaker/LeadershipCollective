USE [master]

If db_id('LeadershipCollective') IS NULL
  CREATE DATABASE [LeadershipCollective]
  GO

  USE [LeadershipCollective]
  GO

  DROP TABLE IF EXISTS [UserProfile];
  DROP TABLE IF EXISTS [Subject];
  DROP TABLE IF EXISTS [ResourceType];
  DROP TABLE IF EXISTS [LeadershipEvent];
  DROP TABLE IF EXISTS [Template];
  DROP TABLE IF EXISTS [UserType];
  DROP TABLE IF EXISTS [MediaRecommendation];
  DROP TABLE IF EXISTS [ConsultantRecommendation];
  DROP TABLE IF EXISTS [MediaRecMessage];
  DROP TABLE IF EXISTS [ConsultantRecMessage];
  GO


CREATE TABLE [UserType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(20) NOT NULL
)

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [DateCreated] datetime NOT NULL,
  [UserTypeId] integer NOT NULL,
  
  CONSTRAINT [FK_UserProfile_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
)
GO

CREATE TABLE [ResourceType] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO



CREATE TABLE [Subject] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [MediaRecommendation] (
  [Id] int PRIMARY KEY IDENTITY,
  [Content] nvarchar(1000),
  [ResourceTypeId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [SubjectId] int NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Author] nvarchar(255) ,
  [PublicationDate] datetime ,
  [LinkAddress] nvarchar(1000),
  [DateCreated] datetime NOT NULL,
  
  CONSTRAINT [FK_MediaRecommendation_ResourceType] FOREIGN KEY ([ResourceTypeId]) REFERENCES [ResourceType] ([Id]),
  CONSTRAINT [FK_MediaRecommendation_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_MediaRecommendation_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [Subject] ([Id])
)
GO

CREATE TABLE [MediaRecMessage] (
  [Id] int PRIMARY KEY IDENTITY,
  [MediaRecommendationId] int NOT NULL,
  [Content] nvarchar(1000) NOT NULL,
  [UserProfileId] int NOT NULL,
  [DateCreated] datetime NOT NULL,

  CONSTRAINT [FK_MediaRecMessage_MediaRecommendation] FOREIGN KEY ([MediaRecommendationId]) REFERENCES [MediaRecommendation] ([Id]),
  CONSTRAINT [FK_MediaRecMessage_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])

)
GO

CREATE TABLE [ConsultantRecommendation] (
  [Id] int PRIMARY KEY IDENTITY,
  [Content] nvarchar(1000),
  [ResourceTypeId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [SubjectId] int NOT NULL,
  [Name] nvarchar(50) NOT NULL,
  [Email] nvarchar(100) ,
  [PhoneNumber] nvarchar(50),
  [serviceArea] nvarchar(100) NOT NULL ,
  [LinkAddress] nvarchar(1000),
  [DateCreated] datetime NOT NULL,
  
  CONSTRAINT [FK_ConsultantRecommendation_ResourceType] FOREIGN KEY ([ResourceTypeId]) REFERENCES [ResourceType] ([Id]),
  CONSTRAINT [FK_ConsultantRecommendation_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_ConsultantRecommendation_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [Subject] ([Id])
)
GO

CREATE TABLE [ConsultantRecMessage] (
  [Id] int PRIMARY KEY IDENTITY,
  [ConsultantRecommendationId] int NOT NULL,
  [Content] nvarchar(1000) NOT NULL,
  [UserProfileId] int NOT NULL,
  [DateCreated] datetime NOT NULL,

  CONSTRAINT [FK_ConsultantRecMessage_ConsultantRecommendation] FOREIGN KEY ([ConsultantRecommendationId]) REFERENCES [ConsultantRecommendation] ([Id]),
  CONSTRAINT [FK_ConsultantRecMessage_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])

)
GO

CREATE TABLE [LeadershipEvent] (
  [Id] int PRIMARY KEY IDENTITY,
  [Title] nvarchar(255),
  [Date] datetime NOT NULL,
  [Location] nvarchar(255) NOT NULL,
  [LinkAddress] nvarchar(1000),
  [ImageLocation] nvarchar(1000),
  [Content] nvarchar(1000) NOT NULL,
  [UserProfileId] int NOT NULL,

  CONSTRAINT [FK_LeadershipEvent_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  

)
GO

CREATE TABLE [Template] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserProfileId] int NOT NULL,
  [LinkAddress] nvarchar(1000) NOT NULL,
  [SubjectId] int NOT NULL,
  [Title] nvarchar(255) NOT NULL,

  CONSTRAINT [FK_Template_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Template_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [Subject] ([Id])

)
GO
