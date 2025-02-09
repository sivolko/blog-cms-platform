FROM ruby:3.0
WORKDIR /app
COPY Gemfile* .
RUN bundle install
COPY . .
EXPOSE 4000
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
